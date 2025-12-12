import { StyleSheet } from 'react-native';
 
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#8FA954',
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
  welcomeTextContainer: {
    flex: 1,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  farmerText: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tipSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
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
    color: '#FFFFFF',
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
  color: "white",
  fontSize: 18,
  fontWeight: "700",
},


});