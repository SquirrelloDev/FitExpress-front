 export const getFlexiCount = (flexiDiet: string): number => {
  switch (flexiDiet){
      case 'Basic':
          return 15;
      case 'Plus':
          return 20;
      case 'All-in':
          return 30;
      default:
          return 15;
  }
}
export const getFlexiTier = (dietName: string): number | null  => {
    switch (dietName){
        case 'Basic':
            return 1;
        case 'Plus':
            return 2;
        case 'All-in':
            return 3;
        default:
            return null;
    }
}
