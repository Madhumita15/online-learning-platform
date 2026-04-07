export interface BlogInitialstate{
  loading: boolean,
  error: string | null,
  blogList: {
    $id: string,
    title: string,
    content: string,
    image?: string,
    status: string
   

  }[],
  page: number,
  totals: number,
  isBlogId: string | null
}

export interface GetallBlogResponseInterface{
    $id: string;
    title: string;
    content: string;
    image?: string;
    status: string
  

}

export interface CreateBlogResponseInterface{
    title: string;
    content: string;
    image?: string;
    authorId: string;
    authorName: string;
    status: string
   

}

export interface UpdateBlogResponseInterface{
    $id: string,
    title: string;
    content: string;
    authorId: string;
    authorName: string;
    status: string

}
