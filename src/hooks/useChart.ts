/* 封装这个hooks是为了如果到时候切换其他可视化库的时候，只需要动这里，组件和页面内不需要修改 */
import * as echarts from 'echarts';
import type { IOption } from '@/components/base-chart/type';
/**
 * @param el 需要渲染图表的dom元素
 * @returns chartInstance 图表初始化的实例对象
 * @returns setOptions 设置配置项并更新图表的方法
 * @returns updateSize 更新图表尺寸的方法
 */
export default function (el: HTMLElement) {
  const chartInstance = echarts.init(el);
  /**
   * @param options 配置对象
   * @description 设置配置项并更新图表的方法
   */
  function setOptions(options: IOption) {
    chartInstance.setOption(options);
  }
  /**
   * @description 更新图表尺寸的方法
   */
  function updateSize() {
    chartInstance.resize();
  }
  window.addEventListener('resize', () => chartInstance.resize());
  return { chartInstance, setOptions, updateSize };
}
