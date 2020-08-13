interface NavItem {
  url: String;
  title: String;
  id: Number;
  parent: Number;
}

interface Post {
  title: String;
  content: String;
  thumbnail?: String;
  data?: String;
  author?: String;
}

declare const _NAV: Array<NavItem>;
declare const _IS_404: Boolean;
declare const _POST_TYPE: String;
declare const _SLUG: String;
declare const _POST: Post;
declare const _POSTS: Array<Post>;
