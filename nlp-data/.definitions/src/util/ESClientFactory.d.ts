export declare namespace ESClientFactory {
    interface IElasticSearchClientParam {
        Host: string;
        Port: number;
        Auth?: {
            name: string;
            password: string;
        };
    }
    function Create(param: IElasticSearchClientParam): any;
}
export default ESClientFactory;
