

import React, { useState, useEffect, useRef } from 'react';
import { SectionList, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, FlatList, Image } from 'react-native';
import { NavigationBar } from '../components';

import GlobalStyle from '../styles/globalstyle';
import { FilterItem, FilterSection } from './components';

import { articleActions } from '../../services/articleactions/articleRedux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

//var selectedObj = []

function FilterListView(props) {
    const pgItem = props.route.params.data
    const [dataSource, setDataSource] = useState([])

    //const selectedObj = useRef(null)
    const [selectedObj, setSelectedObj] = useState([])

    useEffect(() => {
        var dats = []
        var lItem = JSON.parse(JSON.stringify(pgItem))
        lItem.props.pg.map((obj, index) => {
            if (obj._attrs?.extra2 && obj._attrs.extra2 === 'show') {
                obj._attrs.show = false
                obj._attrs.child = obj.pv.length > 0
                var tobj = {
                    sectionObj: obj._attrs,
                    data: obj.pv,
                }

                dats.push(tobj)
            }

        })

        setDataSource(dats)

    }, [])

    const onClickViewAll = () => {
        props.route.params.onGoBack(selectedObj);
        // var params = selectedObj.join('&')
        // let { actions } = props;
        // actions.setSortFilter(params)

        props.navigation.goBack()
    }

    const onClickSection = (sectionObj) => {
        var dataS = Object.assign([], dataSource)
        dataS.map((obj, index) => {
            if (sectionObj.id === obj.sectionObj.id) {
                obj.sectionObj.show = !sectionObj.show
            }
        })

        setDataSource(dataS)
    }

    const onClickItem = (objItem, section) => {
        console.log("")

        var dataS = Object.assign([], dataSource)
        dataS.map((obj, index) => {
            console.log("")
            if (obj.sectionObj.id === section.sectionObj.id) {
                obj.data.map((item, index) => {
                    if (item._attrs.id === objItem._attrs.id) {
                        item.select = !item?.select

                        var uId = `pf${section.sectionObj.id}=${item._attrs.id}`
                        var arr = selectedObj
                        if (arr.indexOf(uId) === -1) {
                            arr.push(uId);
                            console.log(arr);
                            setSelectedObj(arr)
                        } else {
                            arr.splice(arr.indexOf(uId), 1);
                            setSelectedObj(arr)
                        }
                    }
                })
            }
        })

        setDataSource(dataS)
    }

    const renderItem = (item, section) => {
        if (section.sectionObj.show) {
            return (
                <FilterItem title={item} section={section}
                    onClick={(objItem, section) => onClickItem(objItem, section)}
                />
            )
        }
        return null
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* <NavigationBar navigation={props.navigation} title="FILTER" /> */}
            <SectionList
                sections={dataSource}
                keyExtractor={(item, index) => item + index}
                renderItem={({ item, section }) => renderItem(item, section)}
                renderSectionHeader={({ section: { sectionObj } }) => (
                    <FilterSection
                        sectionObj={sectionObj}
                        onClick={(obj) => onClickSection(obj)}
                    />
                )}
                stickySectionHeadersEnabled={false}
            />

            <TouchableOpacity style={styles.btnContainer} onPress={onClickViewAll}>
                <Text style={{ fontFamily: GlobalStyle.fontSet.CenturyGothicBold, color: "#fff" }}>VIEW ITEMS</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    btnContainer: {
        backgroundColor: "#000",
        marginHorizontal: 10,
        marginTop: 12,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        bottom: 20,
    },
})

const mapStateToProps = state => ({
});

const ActionCreators = Object.assign(
    {
        setSortFilter: articleActions.setSortFilter
    },
);
const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterListView)







