 export const getFlexiCount = (flexiDiet: string): number => {
  switch (flexiDiet){
      case 'Basic':
          return 15;
      case 'Plus':
          return 20;
      case 'All-in':
          return 30;
  }
}
