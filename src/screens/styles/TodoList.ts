import { StyleSheet } from 'react-native';
import { hp, rf, wp } from '../../constants/ResponsiveUI';
import { color } from '../../utils/color';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
  },
  stickyButton: {
    position: 'absolute',
    bottom: hp(70),
    right: wp(30),
    width: wp(60),
    height: hp(60),
    borderRadius: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: color.white,
    fontSize: rf(30),
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp(10),
    alignSelf: 'flex-end',
    paddingRight: wp(20),
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  cardContainer: {
    gap: hp(10),
    paddingHorizontal: wp(20),
  },
});
