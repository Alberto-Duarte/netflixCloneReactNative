import { Pressable, SafeAreaView, Text, View } from 'react-native';
import tw from 'twrnc';
import PreviewCard from '../components/PreviewCard';

const Modal = ({ closeModal, movie }) => {
  return (
    <View style={tw`z-100 absolute top-0 left-0 px-12 py-30`}>
      <View style={tw`h-120 w-80 bg-red-500 flex items-center justify-center`}>
        <Text style={tw`text-xl text-black`}>{movie?.original_name || movie?.original_title}</Text>
        <Pressable onPress={closeModal}>
          <Text style={tw`text-xl text-black`}>Dismiss</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Modal;