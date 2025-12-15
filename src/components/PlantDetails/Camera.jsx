import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TakePicture({onPictureTaken }) {
  const [permission, requestPermission] = useCameraPermissions(); 
  const [facing, setFacing] = useState('back');
  const [photoUri, setPhotoUri] = useState(null);
  const camRef = useRef(null);

  if (!permission) return <View style={styles.center}><Text>Loading…</Text></View>;
  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={{ marginBottom: 8 }}>We need camera access</Text>
        <TouchableOpacity style={styles.btn} onPress={requestPermission}>
          <Text style={styles.btnText}>Grant permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const flip = () => setFacing(prev => (prev === 'back' ? 'front' : 'back'));
 const take = async () => {
  if (!camRef.current) return;
  const result = await camRef.current.takePictureAsync({
  base64: true,
  quality: 0.7
});

  onPictureTaken(result.base64);
};

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={camRef} style={{ flex: 1 }} facing={facing} />
      <View style={styles.toolbar}>
        <TouchableOpacity style={styles.btn} onPress={flip}><Text style={styles.btnText}>Flip</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.shutter]} onPress={take}><Text style={styles.btnText}>●</Text></TouchableOpacity>
      </View>
      {/* {photoUri && (
        <View style={styles.preview}>
          <Image source={{ uri: photoUri }} style={{ width: 120, height: 160, borderRadius: 8 }} />
          <Text style={{ marginTop: 8 }} numberOfLines={1}>{photoUri}</Text>
        </View>
      )} */}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  toolbar: { position: 'absolute', bottom: 130, left: 0, right: 0, paddingHorizontal: 24, flexDirection: 'row', justifyContent: 'space-between' },
  btn: { paddingHorizontal: 18, paddingVertical: 10, borderRadius: 12, backgroundColor: 'rgba(0,0,0,0.5)' },
  btnText: { color: '#F4F7E8', fontSize: 16, fontWeight: '600' },
  shutter: { alignSelf: 'center' },
  preview: { position: 'absolute', top: 48, right: 16, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 10 }
});