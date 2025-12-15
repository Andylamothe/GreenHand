import { StyleSheet } from 'react-native';
 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5F8550",
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  welcomeCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  welcomeIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  plantIcon: {
    marginLeft: 10, //
  },
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: '#F4F7E8',
    marginBottom: 4,
  },
  farmerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#F4F7E8',
  },
 
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  weatherTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4F7E8',
    marginBottom: 20,
  },
  weatherMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  weatherMetric: {
    alignItems: 'center',
  },
  weatherIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  weatherValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4F7E8',
  },
 
  tipsCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  tipsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#F4F7E8',
    marginBottom: 16,
  },
  tipItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 24,
    padding: 20,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  tipIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  tipTextContainer: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#F4F7E8',
    marginBottom: 4,
  },
  tipSubtitle: {
    fontSize: 14,
    color: '#f4f7e8b2',
  },
 
  bottomNav: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 32,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navItemActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
    paddingVertical: 12,
  },
  navIcon: {
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F4F7E8',
  },

  floatingAddButton: {
  position: "absolute",
  right: 25,
  bottom: 160,
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "rgba(255,255,255,0.25)",
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#000",
  shadowOpacity: 0.25,
  shadowOffset: { width: 0, height: 3 },
  shadowRadius: 5,
},
nextButton: {
  backgroundColor: "rgba(255,255,255,0.25)",
  paddingVertical: 14,
  alignItems: "center",
  borderRadius: 20,
  marginTop: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
},
nextButtonText: {
  color: "#F4F7E8",
  fontSize: 18,
  fontWeight: "700",
},

    //////// Photos Card //////////

   photosCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 32,
    padding: 24,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  photosHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  photosTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#F4F7E8",
  },

  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(255,255,255,0.20)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },

  addBtnText: {
    color: "#F4F7E8",
    fontSize: 14,
  },

  photosGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  photoItem: {
    width: "48%",
    position: "relative",
  },

  photoImage: {
    width: "100%",
    height: 140,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },

  deleteBtn: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255, 0, 0, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },

  photoDate: {
    color: "#F4F7E8",
    fontSize: 12,
    marginTop: 6,
  },

  emptyPhotos: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },

  emptyIconBox: {
    width: 60,
    height: 60,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  emptyText: {
    color: "#F4F7E8",
  },

  //////// Analyse Card //////////
  analysisCard: {
  backgroundColor: "rgba(255, 255, 255, 0.10)",
  borderRadius: 32,
  padding: 24,
  borderWidth: 1,
  borderColor: "rgba(255, 255, 255, 0.3)",
  marginBottom: 16,
},

analysisHeader: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
},

analysisTitle: {
  fontSize: 20,
  color: "#F4F7E8",
  fontWeight: "600",
},


scoreBox: {
  borderRadius: 32,
  paddingVertical: 24,
  alignItems: "center",
},

scoreSubtitle: {
  color: "#F4F7E8",
  marginBottom: 4,
},

scoreValue: {
  fontSize: 48,
  fontWeight: "700",
  color: "#F4F7E8",
},

scoreLabel: {
  color: "#F4F7E8",
  fontSize: 16,
  marginTop: 4,
},



recoCard: {
  backgroundColor: "rgba(255,255,255,0.10)",
  borderRadius: 24,
  padding: 20,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.20)",
},

recoTitle: {
  fontSize: 18,
  fontWeight: "600",
  color: "#F4F7E8",
  marginBottom: 12,
},

recoItem: {
  flexDirection: "row",
  alignItems: "flex-start",
  gap: 8,
  marginBottom: 8,
},

recoIcon: {
  color: "#A9C46C",
  fontSize: 16,
  marginTop: 3,
},

recoText: {
  fontSize: 14,
  color: "#F4F7E8",
},



reanalyzeBtn: {
  backgroundColor: "rgba(255,255,255,0.20)",
  borderRadius: 24,
  paddingVertical: 14,
  borderWidth: 1,
  borderColor: "rgba(255,255,255,0.3)",
  alignItems: "center",
},

reanalyzeText: {
  color: "#F4F7E8",
  fontSize: 16,
  fontWeight: "600",
},

startAnalyzeBtn: {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 10,
  paddingVertical: 16,
  borderRadius: 28,
  backgroundColor: "#A9C46C",
},

startAnalyzeText: {
  color: "#F4F7E8",
  fontSize: 16,
  fontWeight: "600",
},
  submitButton: {
  marginTop: 20,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  paddingVertical: 16,
  borderRadius: 24,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.3)',
},

submitText: {
  color: '#fff',
  fontSize: 16,
  fontWeight: '700',
},

input: {
  color: '#fff',
  fontSize: 16,
},
});



