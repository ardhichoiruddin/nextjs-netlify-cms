import { useEffect, useState } from 'react'
import Link from 'next/link'
import useSWR from 'swr'

import Head from 'next/head'
import styles from '../styles/Home.module.css'

import arttributes from '../content/home.md'

const url = 'https://jsonplaceholder.typicode.com/posts/'

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

  const { data } = useSWR('/api/getData')
  console.log(data)
  
  const { attributes: {title} } = arttributes
  return (
    <div>
      <h1>{title}</h1>
      <div>
          <ul>
          { data && data.map((item, index) => (
            <li key={index}>{item.title}</li>
          )) }
        </ul>
      </div>
    </div>
  )
}



export async function getStaticProps(){
  const postsList = await importBlogPosts();
  return { props: {postsList} };
}