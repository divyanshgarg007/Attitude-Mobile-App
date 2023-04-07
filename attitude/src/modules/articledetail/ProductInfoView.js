import React from "react"
import { StyleSheet, SafeAreaView, View, ScrollView, Text } from "react-native"
import { NavigationBar } from "../components"
import GlobalStyle from "../styles/globalstyle"

const PRODUCT_DESC = "Killstar. I don't care. They really want you - but I do too. They won't be able to look you in eye in the'F Major' shirt dress; made using a super soft cotton. Features an exaggerated collar, puff shoulders , arge pockets and button-up front. This angsty statement-piece is a dream to style - perfect for gigs with yer besties or late night adventures by the moon!"
export default function ProductInfoView(props) {

    const article = props.route.params.article
    console.log('666028046', article?.extra9)
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            <NavigationBar title="PRODUCT INFORMATION" navigation={props.navigation} />
            <ScrollView style={{ paddingHorizontal: 13, marginTop: 20 }}>
                <Title text={`Item #${article.id} - ${article.descriptionlong}`} />
                <Description style={{ marginTop: 20 }} text={article.descweb} />
                {article?.extra9?.xml?.info_diam &&
                    <View style={{ marginTop: 20, flexDirection: 'row' }}>
                        <Title text="Diameter (cm):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_diam} />
                    </View>
                }
                {article?.extra9?.xml?.info_dierproefvrij &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Animal testing free:"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_dierproefvrij} />
                    </View>
                }
                {article?.extra9?.xml?.info_weight &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Weight (gr.):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_weight} />
                    </View>
                }
                {article?.extra9?.xml?.info_inhoud &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Contents (ml):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_inhoud} />
                    </View>
                }
                {article?.extra9?.xml?.info_prodwid &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Width (cm):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_prodwid} />
                    </View>
                }
                {article?.extra9?.xml?.info_prodhei &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Height (cm):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_prodhei} />
                    </View>
                }
                {article?.extra9?.xml?.info_prodlen &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Length (cm):"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_prodlen} />
                    </View>
                }
                {article?.extra9?.xml?.info_stuksverp &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Pieces in packaging:"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_stuksverp} />
                    </View>
                }
                {article?.extra9?.xml?.info_vegan &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="Vegan:"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.info_vegan} />
                    </View>
                }
                {article?.extra9?.xml?.eancode &&
                    <View style={{ marginTop: 5, flexDirection: 'row' }}>
                        <Title text="EAN:"></Title>
                        <Description style={[styles.description, { marginLeft: 5 }]} text={article?.extra9?.xml?.eancode} />
                    </View>
                }
                {/* <View style={{ marginTop: 20, flexDirection: 'row' }}>
                    <Title text="EAN:"></Title>
                    <Description style={[styles.description, { marginLeft: 5 }]} text="KSRA004068L, KSRA004068M, KSRA004068S, KSRA004068XL, KSRA004068XS, KSRA004068XXL" />
                </View> */}

            </ScrollView>
        </SafeAreaView>
    )
}

function Title(props) {
    return (
        <Text style={[styles.title, props.style]}>{props.text}</Text>
    )
}

function Description(props) {
    return (
        <Text style={[styles.description, props.style]}>{props.text}</Text>
    )
}

const styles = StyleSheet.create({
    title: { fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothicBold },
    description: { fontSize: 14, fontFamily: GlobalStyle.fontSet.CenturyGothic }
})