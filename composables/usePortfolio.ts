export const usePortfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      title: 'Crimson Nebula',
      description: 'A distant nebula captured in the crimson spectrum, showcasing the vibrant dance of cosmic dust and gas.',
      image: {
        thumbnail: 'https://picsum.photos/id/1015/50/33',
        medium: 'https://picsum.photos/id/1015/600/400',
        large: 'https://picsum.photos/id/1015/1200/800',
      },
    },
    {
      id: 2,
      title: 'Oceanic Depths',
      description: 'The mysterious and alluring depths of the ocean, teeming with life yet to be discovered.',
      image: {
        thumbnail: 'https://picsum.photos/id/1016/50/33',
        medium: 'https://picsum.photos/id/1016/600/400',
        large: 'https://picsum.photos/id/1016/1200/800',
      },
    },
    {
      id: 3,
      title: 'Forest of Whispers',
      description: 'An ancient forest where every leaf and branch seems to whisper tales of old.',
      image: {
        thumbnail: 'https://picsum.photos/id/1018/50/33',
        medium: 'https://picsum.photos/id/1018/600/400',
        large: 'https://picsum.photos/id/1018/1200/800',
      },
    },
    {
      id: 4,
      title: 'Mountain\'s Majesty',
      description: 'The awe-inspiring majesty of a mountain peak touching the clouds.',
      image: {
        thumbnail: 'https://picsum.photos/id/1019/50/33',
        medium: 'https://picsum.photos/id/1019/600/400',
        large: 'https://picsum.photos/id/1019/1200/800',
      },
    },
    {
      id: 5,
      title: 'City Lights',
      description: 'A vibrant cityscape at night, painted with the brilliant lights of life and activity.',
      image: {
        thumbnail: 'https://picsum.photos/id/102/50/33',
        medium: 'https://picsum.photos/id/102/600/400',
        large: 'https://picsum.photos/id/102/1200/800',
      },
    },
    {
      id: 6,
      title: 'Silent Sands',
      description: 'The serene and silent beauty of a vast desert under the open sky.',
      image: {
        thumbnail: 'https://picsum.photos/id/1021/50/33',
        medium: 'https://picsum.photos/id/1021/600/400',
        large: 'https://picsum.photos/id/1021/1200/800',
      },
    },
    {
      id: 7,
      title: 'Winter\'s Embrace',
      description: 'A landscape held in winter\'s cold, beautiful embrace.',
      image: {
        thumbnail: 'https://picsum.photos/id/1022/50/33',
        medium: 'https://picsum.photos/id/1022/600/400',
        large: 'https://picsum.photos/id/1022/1200/800',
      },
    },
    {
      id: 8,
      title: 'Autumn\'s Palette',
      description: 'The rich and warm colors of autumn, a palette created by nature itself.',
      image: {
        thumbnail: 'https://picsum.photos/id/1023/50/33',
        medium: 'https://picsum.photos/id/1023/600/400',
        large: 'https://picsum.photos/id/1023/1200/800',
      },
    },
    {
        id: 9,
        title: 'Concrete Jungle',
        description: 'A unique perspective of urban architecture, highlighting the geometry of the concrete jungle.',
        image: {
          thumbnail: 'https://picsum.photos/id/103/50/33',
          medium: 'https://picsum.photos/id/103/600/400',
          large: 'https://picsum.photos/id/103/1200/800',
        },
      },
      {
        id: 10,
        title: 'Rural Charm',
        description: 'The simple, rustic charm of a countryside barn.',
        image: {
          thumbnail: 'https://picsum.photos/id/1035/50/33',
          medium: 'https://picsum.photos/id/1035/600/400',
          large: 'https://picsum.photos/id/1035/1200/800',
        },
      },
      {
        id: 11,
        title: 'Coastal Serenity',
        description: 'The serene and calming view of a coastline.',
        image: {
          thumbnail: 'https://picsum.photos/id/1036/50/33',
          medium: 'https://picsum.photos/id/1036/600/400',
          large: 'https://picsum.photos/id/1036/1200/800',
        },
      },
      {
        id: 12,
        title: 'Industrial Age',
        description: 'A glimpse into the industrial age with the raw power of steam locomotives.',
        image: {
          thumbnail: 'https://picsum.photos/id/1038/50/33',
          medium: 'https://picsum.photos/id/1038/600/400',
          large: 'https://picsum.photos/id/1038/1200/800',
        },
      }
  ]

  const allItems = [
    ...portfolioItems,
    // Let's duplicate the data to simulate a larger dataset for infinite scroll
    ...[...Array(5)].flatMap((_, i) => portfolioItems.map(item => ({ ...item, id: item.id + 12 * (i + 1) })))
  ];

  const totalItems = allItems.length;

  const getPortfolioItems = ({ page = 1, limit = 6 } = {}) => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return allItems.slice(start, end);
  }

  const getPortfolioItemById = (id: number) => {
    return allItems.find(item => item.id === id)
  }

  return {
    getPortfolioItems,
    getPortfolioItemById,
    totalItems,
  }
} 