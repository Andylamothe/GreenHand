import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from "../../style/global";
import { Sparkles } from "lucide-react-native";


export default function PlantAnalyseCard({analysisScore, isAnalyzing, handleAnalyze, getScoreLabel}) {
  return (
    <View style={styles.analysisCard}>


      <View style={styles.analysisHeader}>
    
        <Text style={styles.analysisTitle}>Health Analysis</Text>
      </View>


      {analysisScore !== null ? (
        <View style={{ gap: 16 }}>
          
          <View style={[styles.scoreBox, ]}>
            <Text style={styles.scoreSubtitle}>Health score</Text>
            <Text style={styles.scoreValue}>{analysisScore}%</Text>
            <Text style={styles.scoreLabel}>{getScoreLabel(analysisScore)}</Text>
          </View>

          <TouchableOpacity
            onPress={handleAnalyze}
            disabled={isAnalyzing}
            style={[styles.reanalyzeBtn, isAnalyzing && { opacity: 0.6 }]}
          >
            <Text style={styles.reanalyzeText}>Réanalyser</Text>
          </TouchableOpacity>

        </View>
      ) : (
        <TouchableOpacity
          onPress={handleAnalyze}
          disabled={isAnalyzing}
          style={[styles.startAnalyzeBtn, isAnalyzing && { opacity: 0.6 }]}
        >
          {isAnalyzing ? (
            <>
              <ActivityIndicator color="#FFF" style={{ marginRight: 8 }} />
              <Text style={styles.startAnalyzeText}>Analysis in progress...</Text>
            </>
          ) : (
            <>
               <Sparkles size={24} color="#FDE68A" />
              <Text style={styles.startAnalyzeText}>Analyse health</Text>
            </>
          )}
        </TouchableOpacity>
      )}
    </View>
  )
}