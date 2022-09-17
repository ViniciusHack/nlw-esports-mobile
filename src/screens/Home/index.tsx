import { Image, View } from 'react-native';

import logoImg from '../../assets/logo-nlw-esports.png';
import { GameCard } from '../../components/GameCard';
import { Heading } from '../../components/Heading';
import { GAMES } from '../../utils/games';
import { styles } from './styles';

export function Home() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logoImg} />

      <Heading
        title="Encontre seu duo"
        subtitle="Selecione o game que deseja jogar..."
      />
      {GAMES.map(game => (
        <GameCard
          key={game.id}
          data={game}
        />
      ))}
    </View>
  );
}