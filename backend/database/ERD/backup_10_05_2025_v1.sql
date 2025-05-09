PGDMP  2            
        }           smart_habit_tracker    17.4    17.4 @    7           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            8           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            9           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            :           1262    16793    smart_habit_tracker    DATABASE     y   CREATE DATABASE smart_habit_tracker WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en-US';
 #   DROP DATABASE smart_habit_tracker;
                     postgres    false                        2615    16794    habit_tracker    SCHEMA        CREATE SCHEMA habit_tracker;
    DROP SCHEMA habit_tracker;
                     postgres    false            �            1255    16883    insert_note_function()    FUNCTION     _  CREATE FUNCTION habit_tracker.insert_note_function() RETURNS trigger
    LANGUAGE plpgsql
    AS $$BEGIN
    RAISE NOTICE 'Trigger uruchomiony: przypisywanie note_id = % do activity_date = %', NEW.note_id, CURRENT_DATE;

    UPDATE habit_tracker.activity
    SET note_id = NEW.note_id
    WHERE activity_date = CURRENT_DATE;

    RETURN NEW;
END;
$$;
 4   DROP FUNCTION habit_tracker.insert_note_function();
       habit_tracker               postgres    false    6            �            1259    16796    activity    TABLE     �   CREATE TABLE habit_tracker.activity (
    activity_id bigint NOT NULL,
    user_id integer NOT NULL,
    note_id integer,
    habit_tracker_detail_id integer,
    activity_date date NOT NULL,
    mood_id integer
);
 #   DROP TABLE habit_tracker.activity;
       habit_tracker         heap r       postgres    false    6            �            1259    16795    activity_activity_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.activity_activity_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.activity_activity_id_seq;
       habit_tracker               postgres    false    6    219            ;           0    0    activity_activity_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.activity_activity_id_seq OWNED BY habit_tracker.activity.activity_id;
          habit_tracker               postgres    false    218            �            1259    16805    habit    TABLE     s   CREATE TABLE habit_tracker.habit (
    habit_id bigint NOT NULL,
    habit_name character varying(255) NOT NULL
);
     DROP TABLE habit_tracker.habit;
       habit_tracker         heap r       postgres    false    6            �            1259    16804    habit_habit_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_habit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 0   DROP SEQUENCE habit_tracker.habit_habit_id_seq;
       habit_tracker               postgres    false    221    6            <           0    0    habit_habit_id_seq    SEQUENCE OWNED BY     W   ALTER SEQUENCE habit_tracker.habit_habit_id_seq OWNED BY habit_tracker.habit.habit_id;
          habit_tracker               postgres    false    220            �            1259    16812    habit_tracker    TABLE     �   CREATE TABLE habit_tracker.habit_tracker (
    habit_tracker_id bigint NOT NULL,
    habit_id integer NOT NULL,
    duration interval(3) NOT NULL,
    habit_tracker_detail_id integer NOT NULL
);
 (   DROP TABLE habit_tracker.habit_tracker;
       habit_tracker         heap r       postgres    false    6            �            1259    16811 "   habit_tracker_habit_tracker_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 @   DROP SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq;
       habit_tracker               postgres    false    6    223            =           0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE OWNED BY     w   ALTER SEQUENCE habit_tracker.habit_tracker_habit_tracker_id_seq OWNED BY habit_tracker.habit_tracker.habit_tracker_id;
          habit_tracker               postgres    false    222            �            1259    16819    mood    TABLE     b   CREATE TABLE habit_tracker.mood (
    mood_id bigint NOT NULL,
    mood character varying(255)
);
    DROP TABLE habit_tracker.mood;
       habit_tracker         heap r       postgres    false    6            �            1259    16818    mood_mood_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.mood_mood_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.mood_mood_id_seq;
       habit_tracker               postgres    false    225    6            >           0    0    mood_mood_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE habit_tracker.mood_mood_id_seq OWNED BY habit_tracker.mood.mood_id;
          habit_tracker               postgres    false    224            �            1259    16826    note    TABLE     �   CREATE TABLE habit_tracker.note (
    note_id bigint NOT NULL,
    answer character varying(255) NOT NULL,
    question_id integer NOT NULL
);
    DROP TABLE habit_tracker.note;
       habit_tracker         heap r       postgres    false    6            �            1259    16825    note_note_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.note_note_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.note_note_id_seq;
       habit_tracker               postgres    false    6    227            ?           0    0    note_note_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE habit_tracker.note_note_id_seq OWNED BY habit_tracker.note.note_id;
          habit_tracker               postgres    false    226            �            1259    16833    question    TABLE     w   CREATE TABLE habit_tracker.question (
    question_id bigint NOT NULL,
    question character varying(255) NOT NULL
);
 #   DROP TABLE habit_tracker.question;
       habit_tracker         heap r       postgres    false    6            �            1259    16832    question_question_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.question_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 6   DROP SEQUENCE habit_tracker.question_question_id_seq;
       habit_tracker               postgres    false    6    229            @           0    0    question_question_id_seq    SEQUENCE OWNED BY     c   ALTER SEQUENCE habit_tracker.question_question_id_seq OWNED BY habit_tracker.question.question_id;
          habit_tracker               postgres    false    228            �            1259    16840    user    TABLE       CREATE TABLE habit_tracker."user" (
    user_id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    date_join date NOT NULL
);
 !   DROP TABLE habit_tracker."user";
       habit_tracker         heap r       postgres    false    6            �            1259    16839    user_user_id_seq    SEQUENCE     �   CREATE SEQUENCE habit_tracker.user_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE habit_tracker.user_user_id_seq;
       habit_tracker               postgres    false    6    231            A           0    0    user_user_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE habit_tracker.user_user_id_seq OWNED BY habit_tracker."user".user_id;
          habit_tracker               postgres    false    230            w           2604    16799    activity activity_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.activity ALTER COLUMN activity_id SET DEFAULT nextval('habit_tracker.activity_activity_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.activity ALTER COLUMN activity_id DROP DEFAULT;
       habit_tracker               postgres    false    219    218    219            x           2604    16808    habit habit_id    DEFAULT     ~   ALTER TABLE ONLY habit_tracker.habit ALTER COLUMN habit_id SET DEFAULT nextval('habit_tracker.habit_habit_id_seq'::regclass);
 D   ALTER TABLE habit_tracker.habit ALTER COLUMN habit_id DROP DEFAULT;
       habit_tracker               postgres    false    221    220    221            y           2604    16815    habit_tracker habit_tracker_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id SET DEFAULT nextval('habit_tracker.habit_tracker_habit_tracker_id_seq'::regclass);
 T   ALTER TABLE habit_tracker.habit_tracker ALTER COLUMN habit_tracker_id DROP DEFAULT;
       habit_tracker               postgres    false    222    223    223            z           2604    16822    mood mood_id    DEFAULT     z   ALTER TABLE ONLY habit_tracker.mood ALTER COLUMN mood_id SET DEFAULT nextval('habit_tracker.mood_mood_id_seq'::regclass);
 B   ALTER TABLE habit_tracker.mood ALTER COLUMN mood_id DROP DEFAULT;
       habit_tracker               postgres    false    225    224    225            {           2604    16829    note note_id    DEFAULT     z   ALTER TABLE ONLY habit_tracker.note ALTER COLUMN note_id SET DEFAULT nextval('habit_tracker.note_note_id_seq'::regclass);
 B   ALTER TABLE habit_tracker.note ALTER COLUMN note_id DROP DEFAULT;
       habit_tracker               postgres    false    226    227    227            |           2604    16836    question question_id    DEFAULT     �   ALTER TABLE ONLY habit_tracker.question ALTER COLUMN question_id SET DEFAULT nextval('habit_tracker.question_question_id_seq'::regclass);
 J   ALTER TABLE habit_tracker.question ALTER COLUMN question_id DROP DEFAULT;
       habit_tracker               postgres    false    228    229    229            }           2604    16843    user user_id    DEFAULT     |   ALTER TABLE ONLY habit_tracker."user" ALTER COLUMN user_id SET DEFAULT nextval('habit_tracker.user_user_id_seq'::regclass);
 D   ALTER TABLE habit_tracker."user" ALTER COLUMN user_id DROP DEFAULT;
       habit_tracker               postgres    false    231    230    231            (          0    16796    activity 
   TABLE DATA           y   COPY habit_tracker.activity (activity_id, user_id, note_id, habit_tracker_detail_id, activity_date, mood_id) FROM stdin;
    habit_tracker               postgres    false    219   �P       *          0    16805    habit 
   TABLE DATA           <   COPY habit_tracker.habit (habit_id, habit_name) FROM stdin;
    habit_tracker               postgres    false    221   Q       ,          0    16812    habit_tracker 
   TABLE DATA           m   COPY habit_tracker.habit_tracker (habit_tracker_id, habit_id, duration, habit_tracker_detail_id) FROM stdin;
    habit_tracker               postgres    false    223   1Q       .          0    16819    mood 
   TABLE DATA           4   COPY habit_tracker.mood (mood_id, mood) FROM stdin;
    habit_tracker               postgres    false    225   NQ       0          0    16826    note 
   TABLE DATA           C   COPY habit_tracker.note (note_id, answer, question_id) FROM stdin;
    habit_tracker               postgres    false    227   kQ       2          0    16833    question 
   TABLE DATA           @   COPY habit_tracker.question (question_id, question) FROM stdin;
    habit_tracker               postgres    false    229   HR       4          0    16840    user 
   TABLE DATA           h   COPY habit_tracker."user" (user_id, first_name, last_name, email, password_hash, date_join) FROM stdin;
    habit_tracker               postgres    false    231   6W       B           0    0    activity_activity_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('habit_tracker.activity_activity_id_seq', 6, true);
          habit_tracker               postgres    false    218            C           0    0    habit_habit_id_seq    SEQUENCE SET     H   SELECT pg_catalog.setval('habit_tracker.habit_habit_id_seq', 1, false);
          habit_tracker               postgres    false    220            D           0    0 "   habit_tracker_habit_tracker_id_seq    SEQUENCE SET     X   SELECT pg_catalog.setval('habit_tracker.habit_tracker_habit_tracker_id_seq', 1, false);
          habit_tracker               postgres    false    222            E           0    0    mood_mood_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.mood_mood_id_seq', 1, false);
          habit_tracker               postgres    false    224            F           0    0    note_note_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('habit_tracker.note_note_id_seq', 25, true);
          habit_tracker               postgres    false    226            G           0    0    question_question_id_seq    SEQUENCE SET     N   SELECT pg_catalog.setval('habit_tracker.question_question_id_seq', 58, true);
          habit_tracker               postgres    false    228            H           0    0    user_user_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('habit_tracker.user_user_id_seq', 1, true);
          habit_tracker               postgres    false    230                       2606    16801    activity activity_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_pkey PRIMARY KEY (activity_id);
 G   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_pkey;
       habit_tracker                 postgres    false    219            �           2606    16810    habit habit_pkey 
   CONSTRAINT     [   ALTER TABLE ONLY habit_tracker.habit
    ADD CONSTRAINT habit_pkey PRIMARY KEY (habit_id);
 A   ALTER TABLE ONLY habit_tracker.habit DROP CONSTRAINT habit_pkey;
       habit_tracker                 postgres    false    221            �           2606    16803     activity habit_tracker_detail_id 
   CONSTRAINT     u   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT habit_tracker_detail_id UNIQUE (habit_tracker_detail_id);
 Q   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT habit_tracker_detail_id;
       habit_tracker                 postgres    false    219            �           2606    16817     habit_tracker habit_tracker_pkey 
   CONSTRAINT     s   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_pkey PRIMARY KEY (habit_tracker_id);
 Q   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_pkey;
       habit_tracker                 postgres    false    223            �           2606    16824    mood mood_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY habit_tracker.mood
    ADD CONSTRAINT mood_pkey PRIMARY KEY (mood_id);
 ?   ALTER TABLE ONLY habit_tracker.mood DROP CONSTRAINT mood_pkey;
       habit_tracker                 postgres    false    225            �           2606    16831    note note_pkey 
   CONSTRAINT     X   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_pkey PRIMARY KEY (note_id);
 ?   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_pkey;
       habit_tracker                 postgres    false    227            �           2606    16838    question question_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY habit_tracker.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);
 G   ALTER TABLE ONLY habit_tracker.question DROP CONSTRAINT question_pkey;
       habit_tracker                 postgres    false    229            �           2606    16847    user user_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY habit_tracker."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (user_id);
 A   ALTER TABLE ONLY habit_tracker."user" DROP CONSTRAINT user_pkey;
       habit_tracker                 postgres    false    231            �           2620    16884    note insert_note_trigger    TRIGGER     �   CREATE TRIGGER insert_note_trigger AFTER INSERT ON habit_tracker.note FOR EACH ROW EXECUTE FUNCTION habit_tracker.insert_note_function();
 8   DROP TRIGGER insert_note_trigger ON habit_tracker.note;
       habit_tracker               postgres    false    232    227            �           2606    16858    activity activity_mood_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_mood_id_fkey FOREIGN KEY (mood_id) REFERENCES habit_tracker.mood(mood_id) NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_mood_id_fkey;
       habit_tracker               postgres    false    219    4743    225            �           2606    16853    activity activity_note_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_note_id_fkey FOREIGN KEY (note_id) REFERENCES habit_tracker.note(note_id) NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_note_id_fkey;
       habit_tracker               postgres    false    227    4745    219            �           2606    16848    activity activity_user_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.activity
    ADD CONSTRAINT activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES habit_tracker."user"(user_id) ON DELETE CASCADE NOT VALID;
 O   ALTER TABLE ONLY habit_tracker.activity DROP CONSTRAINT activity_user_id_fkey;
       habit_tracker               postgres    false    231    4749    219            �           2606    16863 )   habit_tracker habit_tracker_habit_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_habit_id_fkey FOREIGN KEY (habit_id) REFERENCES habit_tracker.habit(habit_id) ON DELETE CASCADE NOT VALID;
 Z   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_habit_id_fkey;
       habit_tracker               postgres    false    4739    221    223            �           2606    16868 8   habit_tracker habit_tracker_habit_tracker_detail_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.habit_tracker
    ADD CONSTRAINT habit_tracker_habit_tracker_detail_id_fkey FOREIGN KEY (habit_tracker_detail_id) REFERENCES habit_tracker.activity(habit_tracker_detail_id) ON DELETE CASCADE NOT VALID;
 i   ALTER TABLE ONLY habit_tracker.habit_tracker DROP CONSTRAINT habit_tracker_habit_tracker_detail_id_fkey;
       habit_tracker               postgres    false    223    219    4737            �           2606    16873    note note_question_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_question_id_fkey FOREIGN KEY (question_id) REFERENCES habit_tracker.question(question_id) NOT VALID;
 K   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_question_id_fkey;
       habit_tracker               postgres    false    229    227    4747            �           2606    16878    note note_question_id_fkey1    FK CONSTRAINT     �   ALTER TABLE ONLY habit_tracker.note
    ADD CONSTRAINT note_question_id_fkey1 FOREIGN KEY (question_id) REFERENCES habit_tracker.question(question_id) NOT VALID;
 L   ALTER TABLE ONLY habit_tracker.note DROP CONSTRAINT note_question_id_fkey1;
       habit_tracker               postgres    false    4747    229    227            (   M   x�U���0�7�%!�v�N��������'�bڴ��k�Q�s,gB����B�賚+!�w�-/zds���}G_�\ >�NQ      *      x������ � �      ,      x������ � �      .      x������ � �      0   �   x�Eϱn�@��~�{ T�v.��H�.]���%��r���w�{ՁJ7�����L���['�ȅRX�¦0��[�� �H�c<����5H��(Rm��IN�$��5�H��΄R��«u-�-��Z�2-�|��h�^����O7�E���q��k�\t���>���[?D�y�e'�1�w���u��y�H��	� �N�      2   �  x��V;��8�[����O�H�*�	6�"AI� P*m�Cl���I�5j��	��T�k����n$����Z酴J��*%L-����l�ծU��uf����nR�I)���1~��h�z���q�Q��;h�>�S�"��J�D//8^�J���TW#Dޔ�7/�[?#�Ь�R#���-m㱮ĝp4�K����i�������-=gz�Ӱ�I�z�p7j��͞��=93$��܏����ġ!Փh�U��,/�a�j�b�J�kܾ���#/��MJ�V������L]��3�FT�76�(q�[�̒���O�;��stF�"�쑛���r��g�����@��yQj����/_�����܄�Gc�&i�N��U����"��l?����?�w�@�L�	�A��t�7z+���.n�︧dڜ��%h��b-�����q�HBԁ�ê���X%=���=�+���e���$#S�R��ҥ�z�A��l&ϛ�p�e��K�8���Q�H�O��('$��8y�\��2�4_U�\_\]Ju8�6��]��!���x*��n��,Kӏ:��=b��n?�)[�ujh�Af����ҥPC�	Շ�*��Bu��<����)]���W$4#�@�#����Y�p5�UUoyc9���f���+e��Y�D43�Y����MFJ<K(Kf��*��y�%&�8�R��j���?��ښ&�J1C{�V��J�i6������9e�S�W�Z��p�Os��l�w�"J9�ZbN�-e�K��X�9�(�-���ꩫ5T�V�=e�5��t���(�^V*�q��i�D�������/w���
æS�3� �� z�<����v|�%¸B���)3��܊Ν)8�-0��	��8O)O���{RHɬ��g�g+��QwK���/����`D`��O:T
���Yvb���œ���g'zb'����m̶��u� �΍+�{(��r�z�yS]�0>t�Q��K�/'p�[�F0*f����J�!��<o<C�ueu�!��9�����U�e��{|�T�M�ˬ��j���s�	P��\�-džq�^�g�7���r>P�6�R����0?jX>|To����ZdTd��,�Sհ���>ozd���7ȩx־�Wc��s��rY<���-Jԃh�����!z[*��̫(����c�}GHPXV��sSxOяw3qQ̣�خ:n�~�l6��fwK      4   =   x�3���I�t�/�//�N���I442v(/�+���H,>ڔ�s����p��qqq �B�     