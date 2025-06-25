import { type PiniaPluginContext } from "pinia";
import { toRaw } from "vue";
import { debounce } from "lodash-es";

// 我们只关心 canvas store 的变更
const TARGET_STORE_ID = "canvas";

// [逻辑清晰] 定义所有会修改画布核心数据(pageSchema)的 action 名称
const HISTORY_ACTIONS = new Set([
  "updateChildren", // 拖拽排序、移入移出容器
  "updateComponentProps", // 修改属性
  "deleteComponent", // 删除组件
  "cloneComponent", // 从左侧拖拽添加新组件 (尽管clone本身不修改store，但其后续的拖放会触发updateChildren)
  // 我们暂时将其加入，未来可优化为只监听拖放结束的action
]);

export function historyPlugin({ store }: PiniaPluginContext) {
  // 如果不是我们要监听的store，则直接返回，不做任何处理
  if (store.$id !== TARGET_STORE_ID) {
    return;
  }

  const history: any[] = [];
  let currentIndex = -1;
  let isApplyingHistory = false; // 标志位，防止在执行undo/redo时再次记录历史

  // 核心函数：记录当前 pageSchema 的快照
  const recordHistory = debounce(
    () => {
      // 如果是正在执行undo/redo，则不记录，避免循环
      if (isApplyingHistory) {
        isApplyingHistory = false;
        return;
      }

      // 如果当前指针不在栈顶，说明进行过undo，新的操作会覆盖掉旧的"redo"历史
      if (currentIndex < history.length - 1) {
        history.splice(currentIndex + 1);
      }

      // [关键] 只对 pageSchema 进行深拷贝快照，它是纯粹的数据，避免循环引用
      const snapshot = JSON.parse(
        JSON.stringify(toRaw(store.$state.pageSchema))
      );
      history.push(snapshot);
      currentIndex++;

      // 限制历史记录数量，防止内存溢出
      if (history.length > 50) {
        history.shift();
        currentIndex--;
      }
    },
    300,
    { leading: false, trailing: true }
  ); // 使用防抖，合并短时间内的多次变更（如拖动滑块）

  // [逻辑清晰] Pinia Action的监听器
  store.$onAction(({ name, after }) => {
    // [逻辑清晰] 检查当前被调用的action是否在我们定义的历史记录集合中
    if (!HISTORY_ACTIONS.has(name)) {
      return; // 如果不是，直接忽略
    }

    // `after` 钩子确保我们在 action 执行完毕、状态更新后，再进行历史记录
    after(() => {
      recordHistory();
    });
  });

  // 撤销
  function undo() {
    if (currentIndex > 0) {
      isApplyingHistory = true; // 设置标志位
      currentIndex--;
      const newSchema = JSON.parse(JSON.stringify(history[currentIndex]));
      store.$patch({ pageSchema: newSchema });
    }
  }

  // 重做
  function redo() {
    if (currentIndex < history.length - 1) {
      isApplyingHistory = true; // 设置标志位
      currentIndex++;
      const newSchema = JSON.parse(JSON.stringify(history[currentIndex]));
      store.$patch({ pageSchema: newSchema });
    }
  }

  // [逻辑清晰] 应用启动时，立即记录一次初始状态，作为历史记录的起点
  // 这样用户即使没有做任何操作，也能撤销到最初的空白状态（如果之后有操作的话）
  recordHistory();
  // 取消防抖的首次执行，确保初始状态被立即记录
  recordHistory.flush();

  return { undo, redo };
}
