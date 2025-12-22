import { renderHook, act, waitFor } from "@testing-library/react-native";
import usePlant from "./usePlant"
import { PlantApi } from '../api/plantApi'

/// mocker l'api
jest.mock("../api/plantApi", () => ({
  PlantApi: {
    getPlantDetails: jest.fn(),
    deletePlant: jest.fn(),
    updatePlantWateringDate: jest.fn(),
    updatePlantDetails: jest.fn(),
  },
}));

/// mocker la reponse de l'api
const mockPlantApiResponse = {
  data: {
    plant: {
      _id: "test1",
      name: "Monstera",
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      lastWatered: "2024-01-01",
    },
    category: {
      Growth: "fast",
    },
    photos: [],
  },
};


/// tester le hook usePlant : sans id, plante avec id, mise a jour des details de la plante, et suppression de la plante
describe("usePlant hook", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  /// tester le cas où plantId est null /////////////////////////
  it("should not be working if plantId is null", async () => {
    const { result } = renderHook(() => usePlant(null));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(PlantApi.getPlantDetails).not.toHaveBeenCalled();
    expect(result.current.plant).toBe(null);
    expect(result.current.photos).toEqual([]);
  });



  //tester le cas où plantId est pr/esent///////////////////////////
  it("should retrieve plant details and related data", async () => {
    PlantApi.getPlantDetails.mockResolvedValueOnce(mockPlantApiResponse);

    const { result } = renderHook(() => usePlant("test1"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(PlantApi.getPlantDetails).toHaveBeenCalledWith("test1");
    expect(result.current.plant.name).toBe("Monstera");
    expect(result.current.plant.days).toBeGreaterThan(0);
    expect(result.current.plant.progress).toBeGreaterThan(0);
    expect(result.current.category.Growth).toBe("fast");
  });


    // tester la mise a jour des details///////////////////////////////
  it("should update plant details", async () => {
    PlantApi.getPlantDetails.mockResolvedValueOnce(mockPlantApiResponse);

    PlantApi.updatePlantDetails.mockResolvedValueOnce({
      data: { name: "Updated Plant" },
    });

    const { result } = renderHook(() => usePlant("test1"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updatePlantDetails({ name: "Updated Plant" });
    });

    expect(result.current.plant.name).toBe("Updated Plant");
  });


  /// tester la suppression de la plante///////////////////////////////////
   it('should delete plant without crashing', async () => {
    PlantApi.getPlantDetails.mockResolvedValueOnce(mockPlantApiResponse);
    PlantApi.deletePlant.mockResolvedValueOnce();

    const { result } = renderHook(() => usePlant('test1'));

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.deletePlant();
    });

    expect(PlantApi.deletePlant).toHaveBeenCalledWith('test1');
  });
});
