import Head from 'next/head'
import styles from '../styles/Home.module.css'

import arttributes from '../content/home.md'

const importBlogPosts = () => {
  const markdownFiles = require
    .context('../content/blogPosts', false, /\.md$/)
    .keys()
    .map(relativePath => relativePath.substring(2));
    
  return Promise.all(
    markdownFiles.map(async path => {
      const markdown = await import(`../content/blogPosts/${path}`);
      return { ...markdown.attributes, slug: path.substring(0, path.length - 3) };
    })
  );
};

export default function Home({postsList}) {
  const { attributes: {title} } = arttributes
  return (
    <div>
      <h1>{title}</h1>
    </div>
  )
}



export async function getStaticProps(){
  const postsList = await importBlogPosts();
  return { props: {postsList} };
}