import { StyleSheet } from 'react-native';
import { hp, rf, wp } from '../../constants/ResponsiveUI';
import { color } from '../../utils/color';
import fontFamilies from '../../assets/fonts/font';

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
    fontFamily: fontFamilies.poppins.Regular,
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
