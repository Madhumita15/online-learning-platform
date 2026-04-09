export interface wishListInterface {
  allWishList: {
    $id: string;
    userId: string;
    courseId: string;
  }[];
  isWishlistedMap: {
    [courseId: string]: boolean;
  };
}