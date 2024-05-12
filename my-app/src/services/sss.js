
function getAPI(method, routes, data)
{
    useEffect(() => {
        if (data == null)
            data = [];
        const fetchOrders = async () => {

        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:3001' + {routes}, {
            method: {method},
            headers: {
                'Content-Type': 'application/json',
                // 'Authorization': bearer ${token},

            },
            body: JSON.stringify(data),
            });

            if (!response.ok) {
            throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setOrdersInfo(data);
            console.log(data)
        } catch (error) {
            setError(error.message);
        } finally {
        }
        };

        fetchOrders();

        // Cleanup function
        return () => {
        // Optionally perform cleanup here, such as aborting ongoing requests
        };
    }, []);
}