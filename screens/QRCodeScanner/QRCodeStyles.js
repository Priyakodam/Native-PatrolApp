import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  profileIcon: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  qrSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraIcon: {
    marginBottom: 20,
  },
  scanButton: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  scanButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
