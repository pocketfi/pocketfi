export interface Target {
    target: {
        value: React.SetStateAction<string>;
    };
    preventDefault(): void;
}