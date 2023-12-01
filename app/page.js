import Image from 'next/image'
import styles from './page.module.css'
import Calculator from '../components/Calculator'

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Calculator />
      </main>
    </div>
   

  )
}
