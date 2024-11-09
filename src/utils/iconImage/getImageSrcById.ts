type Image = {
    id: number;
    src: string;
    alt: string;
  };
  
  const images: Image[] = [
    { id: 1, src: '/images/profile_icon/buta.png', alt: 'ぶた' },
    { id: 2, src: '/images/profile_icon/gorira.png', alt: 'ゴリラ' },
    { id: 3, src: '/images/profile_icon/kitune.png', alt: 'きつね' },
    { id: 4, src: '/images/profile_icon/panda.png', alt: 'ぱんだ' },
    { id: 5, src: '/images/profile_icon/pengin.png', alt: 'ペンギン' },
    { id: 6, src: '/images/profile_icon/raion.png', alt: 'らいおん' }
  ];
  
  /**
   * 指定された ID に対応する画像の src を取得します。
   * @param id - 画像の ID
   * @returns 画像の src 文字列
   */
  export const getImageSrcById = (id: number): string => {
    const image = images.find((img) => img.id === id);
    return image ? image.src : '/images/profile_icon/panda.png'; // デフォルト画像の src
  };