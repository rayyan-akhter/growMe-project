// src/components/ArtworksTable.tsx
import React, { useState, useEffect } from 'react';
import { DataTable, DataTableSelectionChangeEvent } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { fetchArtworks } from '../services/api';

interface Artwork {
  id: number;
  title: string;
  place_of_origin: string;
  artist_display: string;
  inscriptions: string;
  date_start: number;
  date_end: number;
}

const ArtworksTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch artworks from the API based on the current page
  const loadArtworks = async (page: number) => {
    setLoading(true);
    const data = await fetchArtworks(page);
    setArtworks(data.data.map((item: any) => ({
      id: item.id,
      title: item.title,
      place_of_origin: item.place_of_origin,
      artist_display: item.artist_display,
      inscriptions: item.inscriptions,
      date_start: item.date_start,
      date_end: item.date_end,
    })));
    setTotalRecords(data.pagination.total);
    setLoading(false);
  };

  // Handle page change in the DataTable
  const onPageChange = (event: any) => {
    setFirst(event.first);
    const page = event.page + 1;
    loadArtworks(page);
  };

  // Handle row selection
  const onRowSelectChange = (e: DataTableSelectionChangeEvent) => {
    const updatedSelection = e.value;
    setSelectedArtworks(updatedSelection);
  };

  useEffect(() => {
    loadArtworks(1); 
  }, []);

  return (
    <div className="card">
      <DataTable
        value={artworks}
        paginator
        rows={10}
        totalRecords={totalRecords}
        lazy
        first={first}
        onPage={onPageChange}
        selection={selectedArtworks}
        onSelectionChange={onRowSelectChange}
        dataKey="id"
        loading={loading}
        selectionMode="multiple"
      >
        <Column selectionMode="multiple" headerStyle={{ width: '3em' }}></Column>
        <Column field="title" header="Title"></Column>
        <Column field="place_of_origin" header="Place of Origin"></Column>
        <Column field="artist_display" header="Artist"></Column>
        <Column field="inscriptions" header="Inscriptions"></Column>
        <Column field="date_start" header="Date Start"></Column>
        <Column field="date_end" header="Date End"></Column>
      </DataTable>
    </div>
  );
};

export default ArtworksTable;
