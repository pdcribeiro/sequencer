export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      element_connections: {
        Row: {
          created_at: string
          element_id: number
          id: number
          next: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          element_id: number
          id?: never
          next: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          element_id?: number
          id?: never
          next?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_element_id_fkey"
            columns: ["element_id"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_next_fkey"
            columns: ["next"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          }
        ]
      }
      elements: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          owner: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          id?: never
          name: string
          owner: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: never
          name?: string
          owner?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "elements_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      sequence_elements: {
        Row: {
          created_at: string
          element_id: number | null
          id: number
          next: number | null
          prev: number | null
          sequence_id: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          element_id?: number | null
          id?: never
          next?: number | null
          prev?: number | null
          sequence_id: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          element_id?: number | null
          id?: never
          next?: number | null
          prev?: number | null
          sequence_id?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sequence_elements_element_id_fkey"
            columns: ["element_id"]
            isOneToOne: false
            referencedRelation: "elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_elements_next_fkey"
            columns: ["next"]
            isOneToOne: false
            referencedRelation: "sequence_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_elements_prev_fkey"
            columns: ["prev"]
            isOneToOne: false
            referencedRelation: "sequence_elements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sequence_elements_sequence_id_fkey"
            columns: ["sequence_id"]
            isOneToOne: false
            referencedRelation: "sequences"
            referencedColumns: ["id"]
          }
        ]
      }
      sequences: {
        Row: {
          created_at: string
          description: string
          id: number
          name: string
          owner: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          description?: string
          id?: never
          name: string
          owner: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          description?: string
          id?: never
          name?: string
          owner?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sequences_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
