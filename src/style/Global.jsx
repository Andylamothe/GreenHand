import { StyleSheet } from 'react-native';


export const COLORS = {
  primaryGreen: "#98b55f",
  lightCream: "#F4FFC3",
  foreground: "#030213",
  background: "#ffffff",
  tabActiveBackground: "rgba(255,255,255,0.3)",
  toggleBar: "rgba(255,255,255,0.2)",
  borderColor : "rgba(255,255,255,0.5)",
  glassBackground: "rgba(255,255,255,0.2)",
  shadowColor: "#000"
};


    const glassBox = {
  borderWidth: 1,
  borderColor: COLORS.borderColor,
  backgroundColor: COLORS.glassBackground,
  borderRadius: 20,
  shadowColor: COLORS.shadowColor,
  shadowOffset: { width: 4, height: 10},
  shadowOpacity: 20,
  shadowRadius: 16,    
  elevation: 12,
  };


 
export const globalStyles = StyleSheet.create({

    container: {
    flex: 1,
    backgroundColor: COLORS.primaryGreen,
  },



  //// tab bar 
  tabBarGlassStyle: {
  ...glassBox,
  position: "absolute",
  bottom: 30,         
  left: 20,
  right: 20,
  height: 90,         
  paddingTop: 25,
  borderRadius: 30,
 
  },

    tabIconActiveBg: {
    width: 60,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  tabIconInactiveBg: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },



  /////////////////////////////////////////////////


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
});