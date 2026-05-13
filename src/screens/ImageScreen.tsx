import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, TouchableOpacity, Text } from 'react-native';
import { DarkHackerTheme } from '../theme/darkHackerTheme';
import { EmergentClient } from '../services/emergentClient';
import { ImageCacheService } from '../services/imageCacheService';
import { ImageGridTile } from '../components/ImageGridTile';
import { ImageViewerModal } from '../components/ImageViewerModal';

export const ImageScreen = () => {
  const [images, setImages] = useState<{prompt: string, url: string}[]>([]);
  const [input, setInput] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const generate = async () => {
    if (!input) return;
    try {
      const url = await EmergentClient.generateImage(input);
      const cached = await ImageCacheService.cacheImage(input, url);
      setImages(prev => [{ prompt: input, url: cached }, ...prev]);
      setInput('');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: DarkHackerTheme.primary, padding: 10 }}>
      <FlatList
        data={images}
        numColumns={3}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => <ImageGridTile url={item.url} onPress={() => setSelectedImage(item.url)} />}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: DarkHackerTheme.header, padding: 10, borderRadius: 8, borderTopWidth: 1, borderTopColor: 'rgba(255,255,255,0.1)' }}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Image prompt..."
          placeholderTextColor={DarkHackerTheme.mutedText}
          style={{ flex: 1, color: DarkHackerTheme.text, backgroundColor: 'rgba(255,255,255,0.05)', padding: 10, borderRadius: 5, fontFamily: 'monospace' }}
        />
        <TouchableOpacity onPress={generate} style={{ padding: 10, marginLeft: 10, backgroundColor: DarkHackerTheme.accent, borderRadius: 5 }}>
           <Text style={{ color: '#000', fontWeight: 'bold', fontFamily: 'monospace' }}>GENERATE</Text>
        </TouchableOpacity>
      </View>
      {selectedImage && <ImageViewerModal url={selectedImage} onClose={() => setSelectedImage(null)} />}
    </View>
  );
};
