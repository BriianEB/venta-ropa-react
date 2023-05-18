import { useState } from 'react';
import { useActionData, useLoaderData, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, MenuItem, Typography } from '@mui/material';

import Breadcrumbs from 'shared/components/Breadcrumbs';
import DataTable from 'shared/components/Table/DataTable';
import TableFilter from 'shared/components/Table/TableFilter';
import TableExport from 'shared/components/Table/TableExport';
import TableSearch from 'shared/components/Table/TableSearch';
import DeleteRowAction from 'shared/components/Table/DeleteRowAction';

import { notifySuccess } from 'store/notificationSlice';

import { api } from 'shared/utils/apiRequest';

import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';


const columns = [
    {
        id: 'id',
        numeric: false,
        label: 'ID',
    },
    {
      id: 'name',
      numeric: false,
      label: 'Name',
    },
    {
      id: 'price',
      numeric: true,
      label: 'Price',
    }
];

function ViewProducts() {
    const products = useLoaderData();
    const action = useActionData();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [filter, setFilter] = useState();

    function handleSearch(term) {
        setFilter(term);
    }

    function onEditRow(row) {
        navigate(`${row.id}/edit`);
    }

    function handleDelete(response, row) {        
        dispatch(notifySuccess('Product deleted succesfully'));
        //getProducts();
    }

    return (
        <Box>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    my: 3
                }}
            >
                <Typography variant="h6">Products</Typography>
                <Breadcrumbs
                    links={[
                        { name: 'Dashboard', path: '/' },
                        { name: 'Products', path: '/products' }
                    ]}
                />
            </Box>

            <Box>
                <Card sx={{p: 1.5 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            p: 1.5
                        }}
                    >
                        <Box>
                            <Button variant="contained" startIcon={<AddIcon />} href="create">
                                <Typography variant="body">Add Product</Typography>
                            </Button>
                        </Box>
                        <Box sx={{ width: '300px' }}>
                            <TableSearch
                                fields={[
                                    'name',
                                    'price'
                                ]}
                                onSelect={handleSearch}
                            />
                            <Box sx={{ px: 1, py: 2 }}>
                                <TableFilter />
                                <TableExport />
                            </Box>
                        </Box>
                    </Box>
                    <DataTable
                        columns={columns}
                        rows={products}
                        filter={filter}
                        actions={(row) => (
                            <>
                                <MenuItem onClick={() => onEditRow(row)}>
                                    <EditIcon fontSize="small" />
                                    <Typography variant="body2">Edit</Typography>
                                </MenuItem>
                                <DeleteRowAction
                                    apiUri={`/products/${row.id}`}
                                    rowName={row.name}
                                    onDelete={
                                        (response) => handleDelete(response, row)
                                    }
                                />
                            </>
                        )}
                    />
                </Card>
            </Box>
        </Box>        
    );
}

export function loader() {
    return api.get('/products');
}


export default ViewProducts;