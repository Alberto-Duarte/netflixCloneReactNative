const imageURL = 'https://image.tmdb.org/t/p/original';
import { ImageBackground, View } from "react-native";
const baseURL ='https://api.themoviedb.org/3/'
import tw from 'twrnc';

const PreviewCard = ({ movie }) => {
    return (
        <View style={tw``}>
            <View style={tw`shadow-black rounded`}>
                <ImageBackground
                    source={{uri: `https://image.tmdb.org/t/p/original${movie?.poster_path}`}}
                    resizeMode={'cover'}
                    style={tw`h-40 w-30 rounded-xl bg-white border border-white/30 overflow-hidden`}
                ></ImageBackground>
            </View>
        </View>
          )}
        

export default PreviewCard