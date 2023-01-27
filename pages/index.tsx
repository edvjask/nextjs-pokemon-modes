/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';

interface Pokemon {
  id: number;
  name: string;
  image: string;
}

export async function getServerSideProps() {
  const resp = await fetch(`https://edvinas-buck.s3.amazonaws.com/index.json`);

  return {
    props: {
      pokemon: (await resp.json()) as Pokemon[],
    },
  };
}

export default function Home({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Pokemon List</title>
      </Head>
      <h2>Pokemon List</h2>
      <div className={styles.grid}>
        {pokemon.map((pokemon) => (
          <div className={styles.card} key={pokemon.id}>
            <Link legacyBehavior href={`/pokemon/${pokemon.id}`}>
              <a>
                <img
                  src={`https://edvinas-buck.s3.amazonaws.com/${pokemon.image}`}
                  alt={pokemon.name}
                />
                <h3>{pokemon.name}</h3>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
