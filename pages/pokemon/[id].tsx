/* eslint-disable @next/next/no-img-element */
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';
import styles from '../../styles/Details.module.css';

type Pokemon = {
  name: string;
  type: string[];
  stats: { name: string; value: number }[];
  image: string;
};

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const resp = await fetch(
    `https://edvinas-buck.s3.amazonaws.com/pokemon/${params?.id}.json`
  );

  return {
    props: {
      pokemon: await resp.json(),
    },
  };
}

export default function Details({
  pokemon,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Head>
        <title>{pokemon.name}</title>
      </Head>
      <div>
        <Link legacyBehavior href="/">
          <a>Back to Home</a>
        </Link>
      </div>
      <div className={styles.layout}>
        <img
          className={styles.picture}
          src={`https://edvinas-buck.s3.amazonaws.com/${pokemon.image}`}
          alt={pokemon.name}
        />
        <div>
          <div className={styles.name}>{pokemon.name}</div>
          <div className={styles.type}>{pokemon.type.join(', ')}</div>
          <table>
            <thead className={styles.header}>
              <tr>
                <th>Name</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {pokemon.stats.map(({ name, value }) => (
                <tr key={name}>
                  <td className={styles.attribute}>{name}</td>
                  <td>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
