import { useEvent } from "expo";
import { useVideoPlayer, VideoView } from "expo-video";
import { StyleSheet, View, Button, TouchableOpacity, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as MediaLibrary from "expo-media-library";

export default function VideoScreen({ route }) {
  const navigation = useNavigation();

  // Check if uri exists, otherwise show an error message
  const uri = route?.params?.uri;

  if (!uri) {
    return (
      <View style={styles.contentContainer}>
        <Text style={{ color: "red", marginBottom: 20 }}>
          No video to display!
        </Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const player = useVideoPlayer(uri, (player) => {
    player.loop = true;
    // player.play();
  });

  const { isPlaying } = useEvent(player, "playingChange", {
    isPlaying: player.playing,
  });

  const saveVideo = () => {
    MediaLibrary.saveToLibraryAsync(uri).then(() => {
      navigation.navigate("Camera");
    });
  };

  return (
    <View style={styles.contentContainer}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
      <View style={styles.controlsContainer}>
        <Button
          title={isPlaying ? "Pause" : "Play"}
          onPress={() => {
            if (isPlaying) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
      </View>
      {/* <View style={styles.btnContainer}>
        <TouchableOpacity onPress={saveVideo} style={styles.btn}>
          <Ionicons name="save-outline" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Camera")}
          style={styles.btn}
        >
          <Ionicons name="trash-outline" size={30} color="black" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 50,
    backgroundColor: '#111',
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    backgroundColor: "white",
  },
  btn: {
    justifyContent: "center",
    margin: 10,
    elevation: 5,
  },
});
