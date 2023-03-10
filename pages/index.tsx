import { useState, useCallback } from 'react'
import { useSwipeable } from 'react-swipeable'
import ReactClearModal from 'react-clear-modal'
import Head from 'next/head'
import Image from 'next/image'

import MEG from '../assets/MEG.png'
import DieUnscreen from '../assets/die-unscreen(1).gif'
import HDC2 from '../assets/HDC2.png'
import Pentagram from '../assets/penta.png'
import Tor from '../assets/tor(2).gif'
import styles from '../styles/Home.module.css'

const WIDTH = 40
const HEIGHT = 30
const PERSPECTIVE = 5000
const CELLS = [
  { id: 'MEG.png', src: MEG },
  { id: 'die-unscreen (1).gif', src: DieUnscreen },
  { id: 'HDC2 (1).png', src: HDC2 },
  { id: 'penta (3).png', src: Pentagram },
  { id: 'tor(2).gif', src: Tor },
]

export default function Home() {
  const [degree, setDegree] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSwipe = useSwipeable({
    onSwipedLeft: ({ deltaX }) => setDegree((prevState) => prevState + deltaX),
    onSwipedRight: ({ deltaX }) => setDegree((prevState) => prevState - deltaX),
    trackTouch: true,
    trackMouse: true,
  })

  const handleOpenModal = useCallback(() => {
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  return (
    <>
      <Head>
        <title>EBRAINS</title>
        <meta name="description" content="Generated by yungrari ©" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.wrapper} {...handleSwipe}>
        <div className={styles.logo}>
          <Image
            src="/ebrains-logo.svg"
            alt="ebrains"
            width={160}
            height={54}
          />
        </div>

        <div className={styles.about}>
          <button type="button" title="About" onClick={handleOpenModal}>
            About
          </button>
        </div>

        <ReactClearModal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
          <div className={styles.aboutContent}>
            <h1>Digital Culture and Ethics of AI</h1>

            <p>
              3D Web application to visually communicate convergence of visual
              art, information technologies such as AI, brain-computer
              interfaces (BCI) and cybersecurity as a core ideas of the Digital
              Culture and Ethics of AI project.
            </p>

            <p>
              The multidisciplinary synthesis project was presented and
              initiated in Berlin during Research Winter School &quot;Ethics of
              Neuroscience and AI&quot; 2021 at{' '}
              <b>Charité – Berlin University of Medicine</b>, Bernstein Center
              for Computational Neuroscience Berlin (BCCN).
            </p>

            <p>
              Project is currently represented on{' '}
              <a
                href="https://community.ebrains.eu/_ideas/-MuqsAgs1AnL0PK2RVJF/about"
                target="_blank"
                rel="noopener noreferrer"
              >
                ebrains.eu
              </a>{' '}
              Community Science Market
            </p>

            <p>
              <b>EBRAINS</b> is a new digital research infrastructure, created
              by the EU-funded Human Brain Project
            </p>
          </div>
        </ReactClearModal>

        <div
          className={styles.scene}
          style={{
            width: `${WIDTH}vw`,
            height: `${HEIGHT}vh`,
            perspective: `${PERSPECTIVE}px`,
          }}
        >
          <div
            className={styles.carousel}
            style={{
              transform: `rotateY(${degree}deg)`,
            }}
          >
            {CELLS.map((value, index, array) => (
              <div
                key={value.id}
                className={styles.cell}
                style={{
                  width: `${WIDTH}vw`,
                  height: `${HEIGHT}vh`,
                  transform: `rotateY(${
                    (360 / array.length) * index
                  }deg) translateZ(${
                    WIDTH / 2 / Math.tan(Math.PI / array.length)
                  }vw)`,
                }}
              >
                <Image
                  src={value.src}
                  alt={value.id}
                  priority={index === 0}
                  draggable="false"
                  fill
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}
