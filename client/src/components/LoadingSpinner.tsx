import { IonSpinner } from "@ionic/react";

export const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <IonSpinner name="crescent" />
    </div>
  );
};
