export type BlogFormInput = {
  title: string;
  content: string; 
  image?: FileList | null
}

export type BlogFields = {
  title: string,
  content: string
}


export type CreateBlogInputResponse={
  title: string,
  content: string,
  image?: File | null
}
export type BlogStatusRowType = {
  title: string;
  content: string;
  image?: string;
  status: string;
  $id: string;
};