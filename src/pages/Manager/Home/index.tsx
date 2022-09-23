import React, { useState } from "react";
import { BikeForm, BikesTableLayout, DialogBox } from "components/";
import { createBike, deleteBikes, updateBikes } from "api/";
import { useAuth, useStore } from "hooks/";
import { BikeType } from "utils/";

export const ManagerHome = () => {
    const { auth } = useAuth();
    const { bikes, loadingBikes } = useStore({});
    const [bikeFormVisible, setBikeFormVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [error, setError] = useState("");
    const [currentBike, setCurrentBike] = useState<BikeType>();
    const [dialogVisible, setDialogvisible] = useState(false);

    const addBike = (bike: BikeType) => {
        setError("");
        setLoading(true);
        setCurrentBike(undefined);
        createBike(bike, auth?.user)
            .then(() => {
                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 1500);
            })
            .catch((e) => setError(e))
            .finally(() => setLoading(false));
    };

    const selectBike = (bike: BikeType, todo: "edit" | "delete") => {
        setCurrentBike(bike);
        if (todo === "delete") return setDialogvisible(true);
        setBikeFormVisible(true);
    };

    const deleteBike = () => {
        setLoading(true);
        deleteBikes(currentBike?.id!)
            .then(() => {})
            .catch((error) => alert(error))
            .finally(() => {
                setLoading(false);
                setDialogvisible(false);
            });
    };

    const updateBike = (bike: BikeType) => {
        setLoading(true);
        updateBikes({ ...bike, id: currentBike?.id })
            .then(() => {
                alert("Success");
            })
            .catch((error) => alert(error))
            .finally(() => {
                setBikeFormVisible(false);
                setLoading(false);
            });
    };

    return (
        <div>
            <div>
                <button
                    className=" ml-auto block text-white bg-black hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    type="button"
                    onClick={() => {
                        setCurrentBike(undefined);
                        setBikeFormVisible(true);
                    }}
                >
                    + New Bike
                </button>
            </div>

            {loadingBikes ? (
                <span className="text-xs">Loading bikes list...</span>
            ) : (
                <BikesTableLayout
                    bikes={bikes}
                    deleteBike={(bike) => selectBike(bike, "delete")}
                    editBike={(bike) => selectBike(bike, "edit")}
                />
            )}

            <BikeForm
                visible={bikeFormVisible}
                hide={() => setBikeFormVisible(false)}
                isLoading={loading}
                save={(bike) => (currentBike ? updateBike(bike) : addBike(bike))}
                success={showSuccess}
                error={error}
                bike={currentBike}
            />

            <DialogBox
                visible={dialogVisible}
                message="Do you want to delete this bike ?"
                title={`Confirm deletion : ${currentBike?.model}`}
                onAccept={deleteBike}
                onCancel={() => setDialogvisible(false)}
            />
        </div>
    );
};
