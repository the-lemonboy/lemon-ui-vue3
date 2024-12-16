/**
 * 单位转换函数：将各种单位（rem, em, vw, vh, %, px 等）转换为像素值
 * 
 * @param param - 需要转换的值（带单位的字符串，如 '10rem'）
 * @param node - 父节点，通常用于计算 em 和百分比单位
 * @param direction - 转换的方向，用于百分比计算（'width' 或 'height'）
 * @param ask - 可选参数，指定不能小于的最小值
 * @returns 返回转换后的像素值
 */
export const converse = function (
  param: string,
  node: HTMLElement,
  direction: 'width' | 'height',
  ask?: number
): number {
  const unit = param.replace(/\d/g, ""); // 提取单位
  const number = parseFloat(param.match(/\d+/)?.[0] || "0"); // 提取数值
  let pxValue: number | null = null;
  let defaultRootFontSize: number | null = null;

  // rem 单位转换
  if (unit === 'rem') {
    defaultRootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    pxValue = defaultRootFontSize * number;

  // em 单位转换
  } else if (unit === 'em') {
    const theParentNode = node.parentNode as HTMLElement;
    if (ask !== undefined) {
      pxValue = ask;
    } else {
      defaultRootFontSize = parseFloat(getComputedStyle(theParentNode).fontSize);
      pxValue = defaultRootFontSize * number;
    }

  // vw 和 vh 单位转换
  } else if (unit === 'vw' || unit === 'vh') {
    let viewportValue: number | null = null;
    if (unit === 'vw') {
      viewportValue = window.innerWidth || document.documentElement.clientWidth;
    } else {
      viewportValue = window.innerHeight || document.documentElement.clientHeight;
    }
    pxValue = (number / 100) * viewportValue;

  // 百分比单位转换
  } else if (unit === '%') {
    let theParentNodeValue: number | null = null;
    if (ask !== undefined) {
      pxValue = ask;
    } else {
      if (direction === 'width') {
        theParentNodeValue = (node.parentNode as HTMLElement).offsetWidth;
      } else {
        theParentNodeValue = (node.parentNode as HTMLElement).offsetHeight;
      }
      pxValue = parseFloat((theParentNodeValue * (number / 100)).toFixed(2));
    }

  // px 单位或无单位的情况
  } else if (unit === 'px' || unit === '') {
    pxValue = number;
  }

  // ask 参数验证
  if (ask !== undefined && pxValue !== null && pxValue < ask) {
    console.error(`lemonui: The Width or Height can't be less than ${ask}px`);
  }

  return pxValue!;
};