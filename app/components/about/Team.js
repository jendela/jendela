import React from 'react';
import Title from '../template/Title';
import Colors from '../../constants/JendelaColors';
import Youtube from '../template/Youtube';

import Author from './Author';

const authors = [
  {
    avatar: 'alsa.png',
    name: 'Alsasian Atmopawiro',
    title: 'Software Engineer',
    location: 'Paris, Perancis',
    twitter: 'alsa',
    linkedin: 'https://id.linkedin.com/in/alsasian'
  },
  {
    avatar: 'cyndy.png',
    name: 'Cyndy Messah',
    title: 'Visual Designer',
    location: 'Singapura',
    twitter: 'cyndymessah',
    linkedin: 'https://sg.linkedin.com/in/cyndymessah'
  },
  {
    avatar: 'ikhsan.png',
    name: 'Ikhsan Assaat',
    title: 'Software Engineer',
    location: 'London, Inggris',
    twitter: 'ixnixnixn',
    linkedin: 'https://uk.linkedin.com/in/ikhsanassaat'
  },
  {
    avatar: 'yoel.png',
    name: 'Yoel Sumitro',
    title: 'UX Designer',
    location: 'Nuremberg, Jerman',
    twitter: 'yoel_krisnanda',
    linkedin: 'https://de.linkedin.com/in/yoelsumitro'
  },
];

class AuthorSection extends React.Component {
  render() {
    return (
      <section className="row">
        <div className="small-12 columns">
          <h3 style={{ color: '#368baf', marginBottom: '1em' }}>Tim Jendela</h3>
        </div>
        {authors.map((author, idx) => {
          return (
            <div className="small-6 medium-6 large-3 columns" key={idx}>
              <Author
                avatar={author.avatar}
                name={author.name}
                title={author.title}
                location={author.location}
                twitter={author.twitter}
                linkedin={author.linkedin}/>
            </div>
          );
        })}
      </section>
    );
  }
}

class Team extends React.Component {
  render() {

    return (
      <div className="row">
        <div className="small-12 columns">

          <Title
            iconPath="img/icon-jendela-info.png"
            text="Tentang Jendela"
            color="#2d4771"/>

          <div className="row" style={{ marginTop: '1em', marginBottom: '1em' }}>
            <div className="large-12 columns">
              <img src="img/jendela-banner.png"/>
            </div>
          </div>

          <div className="row">
            <div className="large-12 columns">
              <h5 style={{ color: '#368baf' }}>Jendela adalah sebuah inisiatif untuk meningkatkan transparansi pelayanan
                publik dan melawan praktek suap dengan cara mengajak partisipasi masyarakat untuk menceritakan
                pengalaman mereka di portal ini.</h5>

              <p>Setiap orang bisa memberikan penilaian dan ulasan atas layanan publik yang diterimanya seperti proses
                pembuatan KTP, Kartu Keluarga, SIM, dll. Bahkan, masyarakat juga bisa melaporkan praktek korupsi yang
                dialaminya secara anonim.</p>

              <p>Kemudian, Jendela akan mengkompilasi semua data yang diterima dan menampilkannya dalam bentuk
                visualisasi data. Visualisasi data dan ulasan lengkap tentang pelayanan public ini bisa digunakan
                bagi:</p>
              <ol>
                <li>Masyarakat umum untuk melihat kualitas layanan publik di daerahnya</li>
                <li>Para kepala daerah dan pejabat publik untuk mengawasi layanan publik di daerahnya dan melakukan aksi
                  akan setiap praktek suap yang dilaporkan oleh masyarakat
                </li>
              </ol>

              <p>Nantinya kami berharap dengan adanya transparansi data maka layanan publik bisa ditingkatkan.</p>
            </div>
          </div>

          <br />

          <Youtube videoID="gg_wcLIH4RA"/>

          <br />

          <AuthorSection />
        </div>
      </div>
    );
  }
}

export default Team;
