import React from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements';

import { emojifyText } from 'utils';
import { colors, fonts, normalize } from 'config';

type Props = {
  repository: Object,
  starred: boolean,
  navigation: Object,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkenContainer: {
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  profile: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
    marginBottom: 2,
    backgroundColor: 'transparent',
  },
  subtitle: {
    color: colors.white,
    ...fonts.fontPrimary,
    fontSize: normalize(12),
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'transparent',
  },
  subtitleDescriptionNoFork: {
    textAlign: 'center',
    marginBottom: Platform.OS === 'ios' ? 20 : 50,
  },
  subtitleDescriptionWithFork: {
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitleFork: {
    fontSize: normalize(10),
    marginBottom: Platform.OS === 'ios' ? 10 : 30,
  },
  details: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    minWidth: 300,
  },
  unit: {
    flex: 1,
  },
  unitNumber: {
    textAlign: 'center',
    color: colors.white,
    ...fonts.fontPrimaryBold,
    fontSize: normalize(16),
  },
  unitText: {
    textAlign: 'center',
    color: colors.white,
    fontSize: normalize(10),
    ...fonts.fontPrimary,
  },
  green: {
    color: colors.lightGreen,
  },
  icon: {
    paddingBottom: 20,
  },
});

export const RepositoryProfile = ({ repository, starred, navigation }: Props) =>
  <View style={styles.container}>
    <View style={styles.profile}>
      <Icon
        containerStyle={[
          styles.icon,
          repository.fork ? { marginLeft: 17 } : { marginLeft: 13 },
        ]}
        name={repository.fork ? 'repo-forked' : 'repo'}
        type="octicon"
        size={45}
        color={colors.greyLight}
      />

      <Text style={styles.title}>
        {repository.name}
      </Text>

      <Text
        style={[
          styles.subtitle,
          repository.fork
            ? styles.subtitleDescriptionWithFork
            : styles.subtitleDescriptionNoFork,
        ]}
      >
        {emojifyText(repository.description)}
      </Text>

      {repository.fork &&
        <Text style={[styles.subtitle, styles.subtitleFork]}>
          {repository.parent &&
            <Text>
              <Text>forked from</Text>
              <Text
                style={{ ...fonts.fontPrimaryBold }}
                onPress={() =>
                  navigation.navigate('Repository', {
                    repository: repository.parent,
                  })}
              >
                {' '}{repository.parent.full_name}
              </Text>
            </Text>}
        </Text>}
    </View>

    <View style={styles.details}>
      <View style={styles.unit}>
        <Text style={[styles.unitNumber, starred && styles.green]}>
          {repository.stargazers_count}
        </Text>
        <Text style={styles.unitText}>Stars</Text>
      </View>

      <View style={styles.unit}>
        <Text style={styles.unitNumber}>
          {repository.forks}
        </Text>
        <Text style={styles.unitText}>Forks</Text>
      </View>
    </View>
  </View>;
