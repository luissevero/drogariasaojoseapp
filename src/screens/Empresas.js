import React, {Component} from 'react'
import {SafeAreaView, 
        View, 
        Text, 
        StyleSheet, 
        Image, 
        FlatList, 
        TouchableOpacity, 
        Alert, 
        ActivityIndicator,
        ScrollView
    } from 'react-native'
import axios from 'axios'
import DeCron from '../components/DeCron'
import {server, serverLocal, showError} from '../common'
import {CAMINHO_SERVIDOR, CAMINHO_CLASSIFICADOS, MOSTRAR_CLASSIFICADOS, CLASSIFICADOS} from '../../config'
import {connect} from 'react-redux'
import {login} from '../store/actions/empresa'
import {grupoClassificado} from '../store/actions/classificado'
import commomStyles from '../commomStyles'
import CabecalhoHome from '../components/CabecalhoHome'
import ImagemProduto from '../components/ImagemProduto'
import BootstrapStyleSheet from 'react-native-bootstrap-styles'

const estadoInicial = {
    empresas: [],
    produtos: [],
    itens: 0,
    empresa: [],
    classificados: [],
    tiposClassificados: [],
    galleryIndex: null,
    grupo: 0,
    parametros: [],
    loading: true,
    loadingEmpresas: true 
}

const
  BODY_COLOR = '#000022',
  TEXT_MUTED = '#888888'

// custom constants
const constants = {
  BODY_COLOR, TEXT_MUTED,
}

// custom classes
const classes = {
  title: {
    color: 'red',
  }
}

const bootstrapStyleSheet = new BootstrapStyleSheet(constants, classes)
const {styles: s, constants: c} = bootstrapStyleSheet

class Empresas extends Component {

    state = {
        ...estadoInicial
    }

    getEmpresa = async (empresa) => {
        await this.setState({empresa})
        this.props.onLogin({...this.state})
        this.props.navigation.navigate('Home', {
            empresa: this.state.empresa
        })
    }
    
    loadTiposClassificados = async () => {
        try{
            const res = await axios.get(`${server}/tiposClassificados`)
            await this.setState({tiposClassificados: res.data})
            await this.setState({loading: false})
        }catch(e){
            showError(e)
        }
    }

    loadParametros = async () => {
        try{
            const res = await axios.get(`${server}/parametros`)
            this.setState({parametros: res.data})
        }catch(e){
            showError(e)
        }
    }

    //chamar a função para mostrar as famílias quando o componente for montado
    componentDidMount = async () => {
        await this.loadEmpresas()
    }
    
    loadEmpresas = async () => {
        try{
            const res = await axios.get(`${server}/empresas`)
            await this.setState({empresas: res.data})
            await this.setState({loadingEmpresas: false})
            //Alert.alert("Teste", `${CAMINHO_SERVIDOR}/logos/ea_novo.png`)
        }catch(e){
            try{
                const resLocal = await axios.get(`${serverLocal}/empresas`)
                this.setState({empresas: resLocal.data})    
            }catch(err){    
                showError(err)
            }
        }       
    }

    abrirClassificados = async (chave) => {
        await this.setState({grupo: chave})
        this.props.onClassificado({...this.state})
        //Alert.alert("aqui", `${this.state.grupo}`)
        this.props.navigation.navigate('Classificados')
    }    

    renderLoadingEmpresas = () => {
        if(!this.state.loadingEmpresas) return null
        return (
              <ActivityIndicator size="large" color={commomStyles.colors.eaCinza}/>
            
          )
    }

    renderEmpresas = () => {
        return (
            <View style={styles.empresas}>
                {!this.state.loadingEmpresas &&
                    <View style={styles.empresas}>
                    <Text style={styles.tituloEmpresa}>Lojas</Text>
                    <FlatList 
                            data={this.state.empresas}
                            numColumns={2}
                            keyExtractor={item => item.Chave}
                            renderItem={({item}) => 
                                <TouchableOpacity activeOpacity={.7} onPress={() => this.getEmpresa({...item})} >
                                    <ImagemProduto {...item} />
                                </TouchableOpacity>
                            } 
                    />
                </View>
                }
                {this.renderLoadingEmpresas()}
            </View>
        )
    }

    abrirMenu = () => {

    }

    render(){
        return(
                <ScrollView style={[s.body], {backgroundColor: commomStyles.colors.eaPreto}}>
                    <CabecalhoHome onClick={() => this.props.navigation.navigate('Selecao')} abreMenu={() => this.abrirMenu()}/> 
                    {this.renderEmpresas()}
                </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commomStyles.colors.eaPreto,
        flex: 1
    },
    cabecalho: {
        flex: 1
    },
    logoEa: {
        width: c.DIMENSIONS_WIDTH - 20,
        height: 100
          
    },
    botoesBanners: {
        alignItems: 'center',      
        padding: 2
    },
    imagensBanners: {
        width: (c.DIMENSIONS_WIDTH) - 12,
        borderRadius: 7,
        borderWidth: 2,
        borderColor: 'white'
    },
    bannerClass: {
        flex: 2,
        borderWidth: 1,
        borderRadius: 8,
        padding: 1,
        margin: 4,
        backgroundColor: '#eee',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bannerClass2: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    empresas: {
        flex: 3
    },
    background: {
        flex: 4
    },
    usuarios: {
        width: 420,
        alignItems: 'center',
        justifyContent: 'center'
    },
    usuario: {
        marginBottom: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    id: {
        color: '#222',
        fontSize: 16
    },
    nome: {
        color: '#111',
        fontSize: 20
    },
    logoutIcon: {
        marginTop: 50
    },
    imagem: {
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        margin: 16,
        padding: 16,
        flexBasis: 0,
        width: 150,
        height: 150,
        borderRadius: 5,
    },
    logos: {
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titulo: {
        fontSize: 48,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: commomStyles.fontFamily
    },
    tituloEmpresa: {
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        color: commomStyles.colors.eaBranco,
        fontFamily: commomStyles.fontFamily,
        borderBottomWidth: 2,
        borderBottomColor: commomStyles.colors.eaCinza,
        marginBottom: 10,
        width: c.DIMENSIONS_WIDTH
    },
    galeria: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        borderWidth: 1,
        borderColor: commomStyles.colors.primary,
        borderRadius: 8
    },
    classificado: {
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: commomStyles.teste.fontFamily,
        fontSize: 24,
        marginTop: -10,
        marginBottom: 10
    },
    tiposClassificados: {
        marginTop: -20
    },
    containerClassificados: {
        marginTop: -15
    },
    tituloClassificado: {
        marginBottom: 10, 
        marginTop: -140,
        fontFamily: commomStyles.fontFamily,
        fontSize: 18,
        textAlign: 'right',
        //justifyContent: 'center',
        backgroundColor: '#ededed88',
        color: '#000'
    },
    bannerImagem: {
        borderWidth: 8,
        borderColor: '#ccc',
        borderRadius: 10,
        width: 215,
        height: 140,
        padding: 5
    }
})

const mapDispatchToProps = dispatch => {
    return{
        onLogin: (empresa) => dispatch(login(empresa)),
        onClassificado: (classificado) => dispatch(grupoClassificado(classificado))
    }
}

export default connect(null, mapDispatchToProps)(Empresas)
/*
<Text style={styles.titulo}>Empresas</Text>
                    <FlatList data={this.state.empresas}
                            numColumns={2}
                            keyExtractor={item => item.Chave}
                            renderItem={({item}) => <View>
                                <Text style={{color: '#f00'}}>{item.imagem_app}</Text>
                                <TouchableOpacity activeOpacity={.6} onPress={this.getUsers} >
                                    <Image {...item} style={styles.imagem} source={require('../assets/gaspilar.png')} />
                                        </TouchableOpacity>
                                </View> 
                            } 
                    />

<Text>{`${CAMINHO_CLASSIFICADOS}${item.url}`}</Text>
<GallerySwiper
    style={styles.galeria}
    sensitiveScroll={true}
    initialPage={this.state.galleryIndex}
    images={carregarImagens()}
    onPageSelected={
        (index) => this.setState({ galleryIndex: index })
    }                        
    loadMinimal={true}
    loadMinimalSize={2}
/> 
{this.renderBanners()}
<DeCron />

                                <Card
                                 title={null}
                                 imageStyle={styles.bannerImagem}
                                 image={{uri: `${CAMINHO_CLASSIFICADOS}${item.url}`}}
                                 containerStyle={{padding: 0, width: 300, height: 10 }}
                                 >
                                 </Card>
*/