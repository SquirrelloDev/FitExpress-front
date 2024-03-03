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
export const getFlexiTier = (dietName: string | undefined): number | null  => {
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
export const getFlexiTierName = (tier: number): string  => {
    switch (tier){
        case 1:
            return 'Basic';
        case 2:
            return 'Plus';
        case 3:
            return 'All-in';
        default:
            return 'Basic';
    }
}
