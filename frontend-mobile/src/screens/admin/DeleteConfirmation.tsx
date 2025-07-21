import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface DeleteConfirmationProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteConfirmation({ visible, onConfirm, onCancel }: DeleteConfirmationProps) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View className="flex-1 bg-black/40 justify-center items-center px-6">
        <View className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg">
          <Text className="text-lg font-bold text-gray-900 mb-2">Konfirmasi Hapus</Text>
          <Text className="text-sm text-gray-600 mb-4">
            Apakah Anda yakin ingin menghapus film ini?
          </Text>
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity onPress={onCancel} className="px-4 py-2 bg-gray-200 rounded-full">
              <Text className="text-sm text-gray-700">Batal</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onConfirm} className="px-4 py-2 bg-red-500 rounded-full">
              <Text className="text-sm text-white">Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}