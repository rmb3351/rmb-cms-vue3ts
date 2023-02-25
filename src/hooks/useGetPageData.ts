import { ref } from 'vue';
import type { IPagination } from '@/components/table-generator/type';
import { INIT_PAGESIZE } from '@/components/table-generator/constants';
import TableGenerator from '@/components/table-generator';

/**
 * @param getDataFn store里获取数据的action
 * @returns tableGenRef 组件内TableGenerator的ref属性对象
 * @returns resetTable 组件内的监听FormGenerator重置的回调，亦用做初始查询
 * @returns searchTable 组件内的监听FormGenerator搜索的回调
 * @returns getNewPageData 分页器对象改变或页面数据改变时重新获取对应条件数据
 */
function useGetPageData(getDataFn: (queryInfo: any) => void) {
  // 为了FormGenerator的搜索也能适配TableGenerator的pageSize而存储
  const currentPageSize = ref(INIT_PAGESIZE);
  // 为了FormGenerator的重置和搜索可以重置TableGenerator的分页器页码而创建
  const tableGenRef = ref<InstanceType<typeof TableGenerator>>();
  // 为了TableGenerator的翻页查询也能适配FormGenerator的搜索条件而存储
  const lastSearchData = ref({});

  /**
   * @description 组件内的监听FormGenerator重置的回调，亦用做初始查询
   */
  function resetTable() {
    lastSearchData.value = {};
    getDataFn({ offset: 0, size: currentPageSize.value });
    tableGenRef.value?.resetCurrentPage();
  }

  /**
   * @description 组件内的监听FormGenerator搜索的回调
   * @param searchData FormGenerator点击搜索时的搜索条件
   */
  function searchTable(searchData: any) {
    lastSearchData.value = searchData;
    getDataFn({ ...searchData, offset: 0, size: currentPageSize.value });
    tableGenRef.value?.resetCurrentPage();
  }

  /**
   * @description 分页器对象改变或页面数据改变时重新获取对应条件数据
   * @param pagination 分页器对象
   */
  function getNewPageData(pagination: IPagination) {
    const { currentPage, pageSize } = pagination;
    const offset = (currentPage - 1) * pageSize;
    if (currentPageSize.value !== pageSize) currentPageSize.value = pageSize;
    getDataFn({ ...lastSearchData.value, offset, size: pageSize });
  }

  return {
    tableGenRef,
    resetTable,
    searchTable,
    getNewPageData
  };
}

export default useGetPageData;
