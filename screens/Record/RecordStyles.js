import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    margin: 5,
    backgroundColor: "#007bff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
  },
  activeTab: {
    backgroundColor: "#0056b3",
  },
  tabText: {
    color: "#fff",
    marginLeft: 5,
  },
  recordingSection: {
    alignItems: "center",
    marginVertical: 20,
  },
  recordingStatus: {
    fontSize: 16,
    marginBottom: 10,
  },
  recordButton: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  stopButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  playButton: {
    backgroundColor: "#ffc107",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    marginTop: 5,
  },
});

export default styles;
