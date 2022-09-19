import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Background } from '../../components/Background';

import { styles } from './styles';

import { useRoute } from '@react-navigation/native';
import { GameParams } from '../../@types/navigation';
import logoImg from '../../assets/logo-nlw-esports.png';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';
import { Heading } from '../../components/Heading';
import { THEME } from '../../theme';

export function Game() {
  const [duos, setDuos] = useState<DuoCardProps[]>([]);
  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://192.168.1.8:8888/games/${game.id}/ads`)
      .then(response => response.json())
      .then(data => setDuos(data))
  }, [])

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name="chevron-thin-left"
              colo={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image
            source={logoImg}
            style={styles.logo}
          />
          <View style={styles.right}/>
        </View>

        <Image
          source={{uri: game.bannerUrl}}
          style={styles.cover}
          resizeMode="cover"
        />

        <Heading
          title={game.title}
          subtitle="Conecte-se e comece a jogar!"
        />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          horizontal
          contentContainerStyle={[duos.length > 0  ? styles.contentList : styles.emptyListContent]}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados ainda.
            </Text>
          )}
          showsHorizontalScrollIndicator={false}
          style={styles.containerList}
          renderItem={({ item }) => (
            <DuoCard
              data={item}
              onConnect={() => {}}
            />
          )}
        />
        
      </SafeAreaView>
    </Background>
  );
}