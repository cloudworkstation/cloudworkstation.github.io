import React from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: 'Easy to Use',
    //imageUrl: 'img/undraw_docusaurus_mountain.svg',
    description: (
      <>
        Deploy the full stack from a single Terraform script.  Users just need a browser to connect to their desktop and get started.
      </>
    ),
  },
  {
    title: 'All Open Source',
    //imageUrl: 'img/undraw_docusaurus_tree.svg',
    description: (
      <>
        The whole stack is a collection of open source components stiched together with open source code.  It is free now and will always be free (of course you pay for your public cloud costs).
      </>
    ),
  },
  {
    title: 'Runs in your environment',
    //imageUrl: 'img/undraw_docusaurus_react.svg',
    description: (
      <>
        This platform runs in your public cloud environment, under your control - you are free to customise it as needed for your use-cases.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={clsx('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

export default function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Cloudworkstation.dev - putting the power of the cloud in your browser">
      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={clsx(
                'button button--outline button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length > 0 && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}
