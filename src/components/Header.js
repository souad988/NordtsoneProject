import {Appbar} from 'react-native-paper';
import {StyleSheet} from 'react-native';

function Header({style}) {
  const styles = StyleSheet.create({
    title: {
      color: '#006778',
    },
  });
  return (
    <Appbar.Header style={style}>
      <Appbar.Content title="Nordstone" style={[styles.title, style]} />
    </Appbar.Header>
  );
}

export default Header;
