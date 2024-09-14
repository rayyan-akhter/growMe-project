import React, { useState, useEffect } from 'react';
import { DataTable, DataTablePageEvent, DataTableSelectionChangeEvent } from 'primereact/datatable';
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

interface ArtworkResponse {
  data: Artwork[];
  pagination: {
    total: number;
  };
}

const ArtworksTable: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [selectedArtworks, setSelectedArtworks] = useState<Artwork[]>([]);
  const [first, setFirst] = useState(0);
  const [loading, setLoading] = useState(false);

  const loadArtworks = async (page: number) => {
    setLoading(true);
    try {
      const response: ArtworkResponse = await fetchArtworks(page);
      setArtworks(response.data);
      setTotalRecords(response.pagination.total);
    } catch (error) {
      console.error('Failed to load artworks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onPageChange = (event: DataTablePageEvent) => {
    const page = Math.floor(event.first / event.rows) + 1; // Calculate page number
    setFirst(event.first);
    loadArtworks(page);
  };

  const onRowSelectChange = (e: DataTableSelectionChangeEvent<Artwork>) => {
    setSelectedArtworks(Array.isArray(e.value) ? e.value : []);
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
